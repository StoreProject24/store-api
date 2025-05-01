import { prisma } from '~config/prisma/prisma';
import { Subcategory, CategoryCreate} from '../types/subcategories.types';

export const create = async (body: CategoryCreate) => {
    const subcategory = await prisma.subCategories.create({
        data: {
            name: body.name,
            categoryId: body.categoryId,
            storeId: body.storeId,
            statusId: 1,
        }
    })
    await prisma.$disconnect()
    return subcategory
}

export const update = async (body: Subcategory) => {
    const subcategory = await prisma.subCategories.update({
        where: {
            id: body.id,
        },
        data: {
            name: body.name,
            statusId: body.statusId,
            categoryId: body.categoryId,
            updatedAt: new Date()
        }
    })

    await prisma.$disconnect()
    return subcategory
}

export const drop = async (id: number) => {
    await prisma.subCategories.delete({
        where: {
            id,
        }
    })
    return await prisma.$disconnect()
}


export const getById = async (id: number) => {
    const subcategory = await prisma.subCategories.findUnique({
        where: {
            id,
        }
    })
    await prisma.$disconnect()
    return subcategory
}