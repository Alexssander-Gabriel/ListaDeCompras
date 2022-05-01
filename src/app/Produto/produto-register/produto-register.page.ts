import { Component, OnDestroy, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { Categoria, Unidade } from 'src/app/app.module';
import { ProdutoService } from 'src/app/produto.service';
import { ProdutoApiServiceService } from 'src/app/ServicesAPI/Produto/produto-api-service.service';
import { MessageService } from 'src/app/services/message.service';
import { finalize } from 'rxjs/operators';
import {
  ViewDidEnter,
  ViewDidLeave,
  ViewWillEnter,
  ViewWillLeave,
} from '@ionic/angular';

@Component({
  selector: 'app-produto-register',
  templateUrl: './produto-register.page.html',
  styleUrls: ['./produto-register.page.scss'],
})
export class ProdutoRegisterPage 
 implements 
  OnInit,
  OnDestroy,
  ViewWillEnter,
  ViewDidEnter,
  ViewWillLeave,
  ViewDidLeave 
  {
  form : FormGroup;
  loading : boolean;
  urlFoto : string;


  constructor(
    private formBuilder: FormBuilder,
    private produtoService: ProdutoService,
    private produtoApiService : ProdutoApiServiceService,
    private router: Router,
    private activatedRoute: ActivatedRoute,
    private messageService : MessageService

  ) {}

  ngOnInit() {
    this.form = this.formBuilder.group({
      id: [''],
      descricao: ['', [Validators.required, Validators.minLength(1)]],
      categoria: [Categoria.A, Validators.required],
      preco: ['', Validators.required],
      unidade: [Unidade.UN, Validators.required],
      foto: ['', Validators.required],
    });

    const id = +this.activatedRoute.snapshot.params.id;

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
            this.urlFoto = produto.foto;
            console.log(this.urlFoto);
          }
        },
        () =>
          this.messageService.error(
            `Erro ao buscar o game com código ${id}`,
            () => this.findById(id)
          )
      );
  }


salvar() {
  const { descricao } = this.form.value;

  this.loading = true;

  this.produtoApiService
    .save(this.form.value)
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
      () => {
        this.messageService.error(`Erro ao salvar o Produto ${descricao}`, () =>{
          this.salvar();
        }  
        );
      }
    );
}


}
