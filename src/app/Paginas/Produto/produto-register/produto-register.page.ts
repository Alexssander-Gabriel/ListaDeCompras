import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Categoria, Unidade } from 'src/app/model/enums';
import { ProdutoApiServiceService } from 'src/app/ServicesAPI/Produto/produto-api-service.service';
import { finalize } from 'rxjs/operators';
import { Produto } from 'src/app/model/produto.model';
import { MessageService } from 'src/app/services/Mensagem/message.service';

@Component({
  selector: 'app-produto-register',
  templateUrl: './produto-register.page.html',
  styleUrls: ['./produto-register.page.scss'],
})
export class ProdutoRegisterPage  implements  OnInit
  {
  form : FormGroup;
  loading : boolean;
  urlFotoA : string;
  produtos : Produto[];
  lblAcao : string;


  constructor(
    private formBuilder: FormBuilder,
    private produtoApiService : ProdutoApiServiceService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private messageService : MessageService
  ) {}

  ngOnInit() {
    this.produtoApiService.getProdutos().subscribe((produtos)=>(this.produtos = produtos));

    this.form = this.formBuilder.group({
      id: [''],
      descricao: ['', [Validators.required, Validators.minLength(1)]],
      categoria: [Categoria.A, Validators.required],
      unidade: [Unidade.UN, Validators.required],
      preco: ['', Validators.required],
      urlFoto: ['', [Validators.required, Validators.minLength(1)]],
      ativo: ['']
    });

    const id = +this.activatedRoute.snapshot.params.id;
    console.log(id);

    if (id) {
      this.findById(id);
      this.lblAcao = 'Atualizar';
    } else {
      this.lblAcao = 'Adicionar';
    }
  
  }


  findById(id: number) {
    this.loading = true;
    this.produtoApiService
      .findById(id)
      .pipe(
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe(
        (produto) => {
          if (produto) {
            this.form.patchValue({
              ...produto,
            });
            this.urlFotoA = produto.urlFoto;
          }
        },
        () =>
          this.messageService.error(
            `Erro ao buscar o Produto com código ${id}`,
            () => this.findById(id)
          )
      );
  }


salvar() {

  const { value } = this.form;
  const { id, descricao } = value;
  
  if (!id){
    delete value.id;
  }

  
  this.loading = true;

  this.produtoApiService
    .save(value)
    .pipe(
      finalize(() => {
        this.loading = false;
      })
    )
    .subscribe(
      () => {
        this.messageService.success(`Produto ${descricao} salvo com sucesso!`);
        this.router.navigate(['produto-list']);
      },
      (ex) => {
        const erro = ex.error.erro;
        const mensagem = `Erro: ${erro}'`;
        this.messageService.error(mensagem, () =>{
        this.loading = true;
        this.salvar();
        }  
        );
      }
    );
}


}
