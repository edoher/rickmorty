export type GridElement = {
    title: string;
    description: string;
    imagePath: string;
};

export type ApiRequest = {
    search?: string;
    page?: number;
    per_page?: number;
};

export type ApiResponse = { count: number; data: GridElement[] };
