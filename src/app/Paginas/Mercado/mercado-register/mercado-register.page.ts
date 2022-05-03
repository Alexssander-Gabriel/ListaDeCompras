import { Component, OnInit, OnDestroy, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Atendimento } from 'src/app/model/enums';
import { MessageService } from 'src/app/services/Mensagem/message.service';
import { MercadoApiServiceService } from 'src/app/ServicesAPI/Mercado/mercado-api-service.service';
import { finalize } from 'rxjs/operators';


@Component({
  selector: 'app-mercado-register',
  templateUrl: './mercado-register.page.html',
  styleUrls: ['./mercado-register.page.scss'],
})
export class MercadoRegisterPage implements OnInit{
  form : FormGroup;
  fotinho : string;
  username : any;
  loading : boolean;

  constructor(
    private formBuilder: FormBuilder,
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

    if (id) {
      this.findById(id);
    }
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
