export interface Book {
    id: number;
    title: string;
    author: string;
    color: string;
  
}

export interface BookDetails {
    title: string;
    author: string;
    plot: string;
    audience: string;
    year: number;
    pages?: number | null;
    publisher: string;

}