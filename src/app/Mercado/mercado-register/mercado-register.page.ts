import { Component, OnInit, OnDestroy, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Atendimento, Mercado } from 'src/app/app.module';
import { MercadoService } from 'src/app/mercado.service';
import { MessageService } from 'src/app/services/message.service';
import {
  ViewDidEnter,
  ViewDidLeave,
  ViewWillEnter,
  ViewWillLeave,
} from '@ionic/angular';
import { MercadoApiServiceService } from 'src/app/ServicesAPI/Mercado/mercado-api-service.service';
import { finalize } from 'rxjs/operators';


@Component({
  selector: 'app-mercado-register',
  templateUrl: './mercado-register.page.html',
  styleUrls: ['./mercado-register.page.scss'],
})
export class MercadoRegisterPage 
implements 
OnInit,
OnDestroy,
ViewWillEnter,
ViewDidEnter,
ViewWillLeave,
ViewDidLeave {
  form : FormGroup;
  fotinho : string;
  username : any;
  loading : boolean;

  constructor(
    private formBuilder: FormBuilder,
    private mercadoService: MercadoService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private renderer: Renderer2,
    private messageService : MessageService,
    private mercadoApiService : MercadoApiServiceService
  ) { }

  ngOnInit() {
    this.form = this.formBuilder.group({
      id: [''],
      nome: ['', [Validators.required, Validators.minLength(3)]],
      endereco: ['', Validators.required],
      contato: [''],
      atendimento: [Atendimento.FF, Validators.required],
      foto: ['', Validators.required],
    });

    const id = +this.activatedRoute.snapshot.params.id;
    //const mercado = this.mercadoService.findById(id);
    
    if (id) {
      this.findById(id);
    }
  }

  ionViewWillEnter(): void {
    console.log('GamesRegisterPage ionViewWillEnter');
  }

  ionViewDidEnter(): void {
    console.log('GamesRegisterPage ionViewDidEnter');
  }

  ionViewWillLeave(): void {
    console.log('GamesRegisterPage ionViewWillLeave');
  }

  ionViewDidLeave(): void {
    console.log('GamesRegisterPage ionViewDidLeave');
  }

  ngOnDestroy(): void {
    console.log('GamesRegisterPage ngOnDestroy');
  }

  findById(id: number) {
    this.loading = true;
    this.mercadoApiService
      .findById(id)
      .pipe(
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe(
        (mercado) => {
          if (mercado) {
            this.form.patchValue({
              ...mercado,
            });
          }
        },
        () =>
          this.messageService.error(
            `Erro ao buscar o Mercado com código ${id}`,
            () => this.findById(id)
          )
      );
  }

  /*
  salvar() {
    this.mercadoService.save(this.form.value);
    this.router.navigate(['mercado-list']);
  }
  */

  salvar() {
    const { nome } = this.form.value;
  
    this.loading = true;
  
    this.mercadoApiService
      .save(this.form.value)
      .pipe(
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe(
        () => {
          this.messageService.success(`Mercado ${nome} salvo com sucesso!`);
          this.router.navigate(['mercado-list']);
        },
        () => {
          this.messageService.error(`Erro ao salvar o Mercado ${nome}`, () =>{
            this.salvar();
          }  
          );
        }
      );
  }


}
