import { NgModule } from "@angular/core";
import { MatCardModule } from '@angular/material/card';
import { MatFormFieldModule } from '@angular/material/form-field';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatTableModule } from '@angular/material/table';
import { MatPaginatorModule } from "@angular/material/paginator";
import { MatDialogModule } from "@angular/material/dialog";

@NgModule({
    exports: [
        MatCardModule, 
        MatFormFieldModule, 
        MatInputModule, 
        MatButtonModule, 
        MatTableModule, 
        MatPaginatorModule,
        MatDialogModule
    ]
})

export class MaterialModel { }