export interface capItem //using coacheeID
{
    coacheeID:string;
    capItemID:string;
    active:boolean;
    currentScore:number;
    capItemCode:string;
    capCategoryNumber:number;
    capCategoryDescription:string;
    capItemDescription:string;
    touchpointID:string
}

interface aCapItem
{
    capItemID:string
    capItemCode:string,
    capItemDescription:string,
}

export interface capCategory
{
    capCategoryID:string,
    capCategoryNumber:number,
    capCategoryDescription:string;
    companyID:string,
    capItems: aCapItem[]
}

export interface newCapItem
{
    capItemID:string
    capCategoryID:string;
    capItemCode:string;
    capItemDescription:string;
    coacheeID:string
}

export interface coacheeCapItem
{
    coacheeID:string,
    capItemID:string,
    active:boolean,
    currentScore:number
}