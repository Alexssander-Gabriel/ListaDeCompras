import { Component, OnInit, OnDestroy, Renderer2, ViewChild } from '@angular/core';
import { Categoria, Lista, Mercado, Produto, Tipo } from 'src/app/app.module';
import { ListaService } from 'src/app/lista.service';
import {
  ViewDidEnter,
  ViewDidLeave,
  ViewWillEnter,
  ViewWillLeave,
} from '@ionic/angular';
import { finalize } from 'rxjs/operators';
import { ListaApiService } from 'src/app/ServicesAPI/Lista/lista-api.service';
import { MessageService } from 'src/app/services/message.service';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { MercadoApiServiceService } from 'src/app/ServicesAPI/Mercado/mercado-api-service.service';
import { ProdutoApiServiceService } from 'src/app/ServicesAPI/Produto/produto-api-service.service';

@Component({
  selector: 'app-lista-register',
  templateUrl: './lista-register.page.html',
  styleUrls: ['./lista-register.page.scss'],
})
export class ListaRegisterPage implements 
OnInit,
OnDestroy,
ViewWillEnter,
ViewDidEnter,
ViewWillLeave,
ViewDidLeave {
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
    private listaService: ListaService,
    private messageService : MessageService,
    private mercadoApiService: MercadoApiServiceService,
    private produtoApiService : ProdutoApiServiceService
  ) {
    this.loading = false;
    //this.listas = listaService.getLista();
   }

  ngOnInit() {
    
    this.mercadoApiService.findAll().subscribe((mercado) => this.mercados = mercado);
    this.produtoApiService.getProdutos().subscribe((produto)=>{this.produtos = produto});
    
    this.form = this.formbuilder.group({
      id: [''],
      descricao: ['', [Validators.required, Validators.minLength(1)]],
      /*produtos: [{}, Validators.required],
      mercado: [{}, Validators.required],*/
      produtos: [[]],
      mercado: [[], Validators.required],
      categoria: [Tipo.CB, Validators.required]
    })

    const id = +this.activatedRoute.snapshot.params.id;

    if (id) {
      this.findById(id);
      this.listaApiService.findAllProdutos(id).subscribe((produto)=>{this.produtos = produto});

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
            () => this.findById(id)
          )
      );
  }


  salvar() {
    const { descricao } = this.form.value;
  
    this.loading = true;
  
    this.listaApiService
      .save(this.form.value)
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
        () => {
          this.messageService.error(`Erro ao salvar a Lista ${descricao}`, () =>{
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
  /*
  retornaProdutos(lista: Lista){
    lista.produtos.forEach(element => {
      this.produtoApiService.
        findById(element.id).
        subscribe( 
          (produto) =>{
            this.produtos.push(produto);
          }
        ) 
    });

    
    
    /*
    this.produtoApiService.findById().subscribe((produto)=>{ this.produtos = produto})
    
  }*/


}
