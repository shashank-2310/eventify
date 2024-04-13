"use client"

import {
    Select,
    SelectContent,
    SelectItem,
    SelectTrigger,
    SelectValue,
} from "@/components/ui/select"
import { getAllCategories } from "@/lib/actions/category.actions";
import { ICategory } from "@/lib/database/models/category.model";
import { formUrlQuery, removeKeysFromQuery } from "@/lib/utils";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";


const CategoryFilter = () => {
    const router = useRouter();
    const searchParams = useSearchParams();

    const [categories, setCategories] = useState<ICategory[]>([]);

    useEffect(() => {
        const getCategories = async () => {
            const categoryList = await getAllCategories();
            categoryList && setCategories(categoryList as ICategory[])
        }

        getCategories();
    }, [])

    const onSelectCategory = (category: string) => {
        let newUrl = '';
        if (category && category !== 'All') {
            newUrl = formUrlQuery({
                params: searchParams.toString(),
                key: 'category',
                value: category
            })
        } else {
            newUrl = removeKeysFromQuery({
                params: searchParams.toString(),
                keysToRemove: ['category'],
            })
        }
        router.push(newUrl, { scroll: false });
    }

    return (
        <Select onValueChange={(value: string) => onSelectCategory(value)}>
            <SelectTrigger className="select-field">
                <SelectValue placeholder="Category" />
            </SelectTrigger>
            <SelectContent>
                <SelectItem value="All" className="p-regular-14 select-item">All</SelectItem>

                {categories.map((category) => (
                    <SelectItem key={category._id} value={category.name} className="p-regular-14 select-item">{category.name}</SelectItem>
                ))}
            </SelectContent>
        </Select>

    )
}

export default CategoryFilter