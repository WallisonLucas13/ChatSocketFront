import { RouterModule, Routes } from "@angular/router";
import { ChatComponent } from "../chat/chat.component";
import { LoginComponent } from "../login/login.component";
import { ModuleWithProviders } from "@angular/core";
import { RegisterComponent } from "../register/register.component";

const ROUTES: Routes = [
    {path: '', redirectTo: 'chat', pathMatch: 'full'},
    {path: 'chat', component: ChatComponent},
    {path: 'login', component: LoginComponent},
    {path: 'register', component: RegisterComponent}
];

export const routing: ModuleWithProviders<RouterModule> = RouterModule.forRoot(ROUTES);