export class ResultModel {
  results: ProductoModel[];
}

export class ProductoModel {
  id!: string;
  title!: string;
  price!: number;
  thumbnail!: string;
}
