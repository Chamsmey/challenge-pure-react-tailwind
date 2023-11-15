export interface Course extends Title {
    id: number;
    summarize: string;
    chapters :Chapter[]
}

export interface Chapter  extends Title {
    lessons: Lesson[];
}

export interface Lesson  extends Title { 

    content: string;
    
}


export interface Title {
 title: string;
}
