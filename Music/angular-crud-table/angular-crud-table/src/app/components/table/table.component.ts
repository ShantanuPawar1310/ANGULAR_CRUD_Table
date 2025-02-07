import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule, FormGroup, FormControl, Validators } from '@angular/forms';
import { NgxChartsModule } from '@swimlane/ngx-charts';

@Component({
  selector: 'app-table',
  standalone: true,
  imports: [CommonModule, ReactiveFormsModule, NgxChartsModule], // Add NgxChartsModule
  templateUrl: './table.component.html',
  styleUrls: ['./table.component.css'],
})
export class TableComponent {
  productForm: FormGroup;
  products: any[] = [];
  editingIndex: number | null = null;

  // Chart Data
  chartData: any[] = [];

  constructor() {
    this.productForm = new FormGroup({
      name: new FormControl('', Validators.required),
      price: new FormControl('', [Validators.required, Validators.min(1)]),
      category: new FormControl('', Validators.required),
    });
  }

  /** Add or Update Product */
  onSubmit() {
    if (this.productForm.invalid) return;

    if (this.editingIndex !== null) {
      this.products[this.editingIndex] = this.productForm.value;
      this.editingIndex = null;
    } else {
      this.products.push(this.productForm.value);
    }

    this.updateChartData(); // Update the chart
    this.productForm.reset();
  }

  /** Edit a product */
  editProduct(index: number) {
    this.editingIndex = index;
    this.productForm.setValue(this.products[index]);
  }

  /** Delete a product */
  deleteProduct(index: number) {
    this.products.splice(index, 1);
    this.updateChartData(); // Update the chart
  }

  /** Update chart data based on products */
  updateChartData() {
    this.chartData = this.products.map(product => ({
      name: product.name,
      value: product.price, // Using price as the value for the chart
    }));
  }
}
//file for creating , updating , deleting and editing 