import { NgModule } from '@angular/core';
import { PreloadAllModules, RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  {
    path: 'home',
    loadChildren: () => import('./home/home.module').then( m => m.HomePageModule)
  },
  {
    path: '',
    redirectTo: 'home',
    pathMatch: 'full'
  },
  {
    path: 'produto-list',
    loadChildren: () => import('./Paginas/Produto/produto-list/produto-list.module').then( m => m.ProdutoListPageModule)
  },
  {
    path: 'produto-register',
    loadChildren: () => import('./Paginas/Produto/produto-register/produto-register.module').then( m => m.ProdutoRegisterPageModule)
  },
  {
    path: 'lista-list',
    loadChildren: () => import('./Paginas/Lista/lista-list/lista-list.module').then( m => m.ListaListPageModule)
  },
  {
    path: 'lista-register',
    loadChildren: () => import('./Paginas/Lista/lista-register/lista-register.module').then( m => m.ListaRegisterPageModule)
  },
  {
    path: 'mercado-list',
    loadChildren: () => import('./Paginas/Mercado/mercado-list/mercado-list.module').then( m => m.MercadoListPageModule)
  },
  {
    path: 'mercado-register',
    loadChildren: () => import('./Paginas/Mercado/mercado-register/mercado-register.module').then( m => m.MercadoRegisterPageModule)
  },
  {
    path: 'dashboard',
    loadChildren: () => import('./Paginas/dashboard/dashboard.module').then( m => m.DashboardPageModule)
  },
  {
    path: 'lista-compra',
    loadChildren: () => import('./Paginas/Lista/lista-compra/lista-compra.module').then(m => m.ListaCompraPageModule)
  },
];

@NgModule({
  imports: [
    RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
  ],
  exports: [RouterModule]
})
export class AppRoutingModule { }
