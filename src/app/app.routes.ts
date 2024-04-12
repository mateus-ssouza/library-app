import { UserProfileComponent } from './pages/user/user-profile/user-profile.component';
import { Routes } from '@angular/router';
import { UserEditComponent } from './pages/user/edit/edit.component';
import { DetailsComponent } from './pages/user/details/details.component';
import { BookPageComponent } from './pages/book/book-page/book-page.component';
import { BookRegisterComponent } from './pages/book/book-register/book-register.component';
import { BookEditComponent } from './pages/book/book-edit/book-edit.component';
import { BookDetailsComponent } from './pages/book/book-details/book-details.component';
import { CopyPageComponent } from './pages/copy/copy-page/copy-page.component';
import { CopyRegisterComponent } from './pages/copy/copy-register/copy-register.component';
import { CopyListComponent } from './pages/copy/copy-list/copy-list.component';
import { CopyDetailsComponent } from './pages/copy/copy-details/copy-details.component';
import { CopyRegisterHomepageComponent } from './pages/copy/copy-register-homepage/copy-register-homepage.component';
import { CopyEditComponent } from './pages/copy/copy-edit/copy-edit.component';
import { LoginComponent } from './pages/auth/login/login.component';
import { UserPageComponent } from './pages/user/user-page/user-page.component';
import { LayoutComponent } from './layout/layout/layout.component';
import { AuthGuard } from './utils/auth.guard';
import { UserTypeGuard } from './utils/user.type.guard';
import { LoanPageComponent } from './pages/loan/loan-page/loan-page.component';
import { LoanDetailsComponent } from './pages/loan/loan-details/loan-details.component';
import { LoanRegisterComponent } from './pages/loan/loan-register/loan-register.component';
import { LoanEditComponent } from './pages/loan/loan-edit/loan-edit.component';
import { RegisterComponent } from './pages/auth/register/register.component';
import { LoanPageClientComponent } from './pages/client/loan-page/loan-page.component';
import { LoanDetailsClientComponent } from './pages/client/loan-details/loan-details.component';

export const routes: Routes = [
  { path: 'login', component: LoginComponent },
  { path: '', redirectTo: '/login', pathMatch: 'full' },
  { path: 'cadastro', component: RegisterComponent },
  { path: '', component: LayoutComponent, canActivate:[AuthGuard], children: [
    { path: 'usuarios', component: UserPageComponent,  canActivate:[UserTypeGuard] },
    { path: 'usuario/detalhes/:id', component: DetailsComponent, canActivate:[UserTypeGuard] },
    { path: 'usuario/editar/:id', component: UserEditComponent, canActivate:[UserTypeGuard] },
    { path: 'livros', component: BookPageComponent, canActivate:[UserTypeGuard]},
    { path: 'livro/cadastro', component: BookRegisterComponent, canActivate:[UserTypeGuard] },
    { path: 'livro/editar/:id', component: BookEditComponent, canActivate:[UserTypeGuard] },
    { path: 'livro/detalhes/:id', component: BookDetailsComponent, canActivate:[UserTypeGuard] },
    { path: 'copias', component: CopyPageComponent, canActivate:[UserTypeGuard] },
    { path: 'copias/lista/:bookId', component: CopyListComponent, canActivate:[UserTypeGuard] },
    { path: 'copia/detalhes/:bookId/:copyId', component: CopyDetailsComponent, canActivate:[UserTypeGuard] },
    { path: 'copia/cadastro/:bookId', component: CopyRegisterComponent, canActivate:[UserTypeGuard] },
    { path: 'copia/cadastro', component: CopyRegisterHomepageComponent, canActivate:[UserTypeGuard] },
    { path: 'livro/:idBook/copia/editar/:idCopy', component: CopyEditComponent, canActivate:[UserTypeGuard] },
    { path: 'emprestimos', component: LoanPageComponent, canActivate:[UserTypeGuard] },
    { path: 'emprestimo/detalhes/:id', component: LoanDetailsComponent, canActivate:[UserTypeGuard] },
    { path: 'emprestimo/solicitacao', component: LoanRegisterComponent },
    { path: 'emprestimo/editar/:id', component: LoanEditComponent, canActivate:[UserTypeGuard] },
    { path: 'meus-emprestimos', component: LoanPageClientComponent },
    { path: 'meus-emprestimos/detalhes/:id', component: LoanDetailsClientComponent },
    { path: 'meu-perfil', component: UserProfileComponent },
  ]},
  { path: '**', redirectTo: '/login' },
];
