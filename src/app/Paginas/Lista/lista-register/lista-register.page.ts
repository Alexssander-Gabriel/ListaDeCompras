import { Component, OnInit, OnDestroy, Renderer2, ViewChild } from '@angular/core';
import { Categoria, Tipo } from 'src/app/model/enums';
import { Mercado } from 'src/app/model/mercado.model';
import { Produto } from 'src/app/model/produto.model';
import { Lista } from 'src/app/model/lista.model';
import { finalize } from 'rxjs/operators';
import { ListaApiService } from 'src/app/ServicesAPI/Lista/lista-api.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MercadoApiServiceService } from 'src/app/ServicesAPI/Mercado/mercado-api-service.service';
import { ProdutoApiServiceService } from 'src/app/ServicesAPI/Produto/produto-api-service.service';
import { MessageService } from 'src/app/services/Mensagem/message.service';

@Component({
  selector: 'app-lista-register',
  templateUrl: './lista-register.page.html',
  styleUrls: ['./lista-register.page.scss'],
})
export class ListaRegisterPage implements OnInit {
  listas : Lista[];
  mercados : Mercado[];
  produtos : Produto[];
  loading : boolean;
  form : FormGroup;

  constructor(
    private formbuilder : FormBuilder,
    private listaApiService : ListaApiService,
    private router : Router,
    private activatedRoute : ActivatedRoute,
    private renderer : Renderer2,
    private messageService : MessageService,
    private mercadoApiService: MercadoApiServiceService,
    private produtoApiService : ProdutoApiServiceService
  ) {
    this.loading = false;
   }

  ngOnInit() {
    
    this.mercadoApiService.findAll().subscribe((mercado) => this.mercados = mercado);
    this.produtoApiService.getProdutos().subscribe((produto)=>{this.produtos = produto});
    
    this.form = this.formbuilder.group({
      id: [''],
      descricao: ['', [Validators.required, Validators.minLength(1)]],
      produtos: [[], Validators.required],  
      mercados: [[], Validators.required],
      categoria: [Tipo.CB, Validators.required]
    })

    const id = +this.activatedRoute.snapshot.params.id;

    if (id) {
      this.findById(id);
    }

    this.listaApiService.armazenaTotalListas();
  }

  findById(id: number) {
    this.loading = true;
    this.listaApiService
      .findById(id)
      .pipe(
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe(
        (lista) => {
          if (lista) {
            this.form.patchValue({
              ...lista,
            });
          }
        },
        () =>
          this.messageService.error(
            `Erro ao buscar a Lista com código ${id}`,
            () => {
              this.findById(id)
              this.loading =  true;
            }
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
  
    this.listaApiService
      .save(value)
      .pipe(
        finalize(() => {
          this.loading = false;
        })
      )
      .subscribe(
        () => {
          this.messageService.success(`Lista ${descricao} salva com sucesso!`);
          this.router.navigate(['lista-list']);
        },
        (ex) => {
          var mensagem = ex.error.Erro;
          console.log(ex);
          console.log(mensagem);
          this.messageService.error(`Erro: ${mensagem}`, () =>{
          this.loading  =true;
          this.salvar();
          }  
          );
        }
      );
  }

  compareWithMercado(o1: Mercado, o2: Mercado | Mercado[]) {
    if (!o1 || !o2) {
      return o1 === o2;
    }

    if (Array.isArray(o2)) {
      return o2.some((u: Mercado) => u.id === o1.id);
    }

    return o1.id === o2.id;
  } 
  
  compareWithProduto(o1: Produto, o2: Produto | Produto[]) {
    if (!o1 || !o2) {
      return o1 === o2;
    }

    if (Array.isArray(o2)) {
      return o2.some((u: Produto) => u.id === o1.id);
    }

    return o1.id === o2.id;
  }  


}
