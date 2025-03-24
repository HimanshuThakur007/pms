export interface AssetsManagementDataType {
    [key: string]: any;
    name: string;
    alias: string;
    description: string;
    parentCategory?:any,
   
  }
export interface CategoryDataType {
    [key: string]: any;
    category?:{ label: string; value: number | string }[]
  }