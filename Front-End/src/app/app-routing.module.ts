import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { FormRegisterUserComponent } from './form-register-user/form-register-user.component';
import { UserLoginComponent } from './user-login/user-login.component';
import { ChatRoomComponent } from './chat-room/chat-room.component';

const routes: Routes = [
  {path: '', component: HomeComponent},
  {path:'register', component: FormRegisterUserComponent},
  {path:'login', component: UserLoginComponent},
  {path:'chatRoom', component: ChatRoomComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
