import { Component, OnInit, OnDestroy, Renderer2, ViewChild } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Atendimento } from 'src/app/model/enums';
import { MercadoApiServiceService } from 'src/app/ServicesAPI/Mercado/mercado-api-service.service';
import { finalize } from 'rxjs/operators';
import { Mercado } from 'src/app/model/mercado.model';
import { MessageService } from 'src/app/services/Mensagem/message.service';


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
  mercados : Mercado[];

  constructor(
    private formBuilder: FormBuilder,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private messageService : MessageService,
    private mercadoApiService : MercadoApiServiceService
  ) { }

  ngOnInit() {
    this.mercadoApiService.getMercados().subscribe((mercadinhos)=>(this.mercados = mercadinhos));
    this.form = this.formBuilder.group({
      atendimento: [Atendimento.A, Validators.required],
      contato: ['', [Validators.required, Validators.minLength(1)]], 
      endereco: ['', [Validators.required, Validators.minLength(1)]], 
      id: [''],  
      nome: ['', [Validators.required, Validators.minLength(1)]],     
      urlFoto: ['', [Validators.required, Validators.minLength(1)]],
      ativo: ['']         
    });

    const id = +this.activatedRoute.snapshot.params.id;
    console.log(id);

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
        (ex) =>
          this.messageService.error(
            `Erro ao buscar o Mercado com código ${id}! Erro: ${ex.error.erro}`,
            () => this.findById(id)
          )
      );
  }

 
  salvar() {
    const { value } = this.form;

    const { id, nome } = value;

    if (!id){
      delete value.id;
    }
  
    this.loading = true;
  
    this.mercadoApiService
      .save(value)
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
        (ex) => {
          let mensagem = ex.error.erro;
          this.messageService.error(`Erro: ${mensagem}`, () =>{
          this.loading = true;
          this.salvar();
          }  
          );
        }
      );
  }


}
