import mongoose from "mongoose";
import {
    getCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory,
} from "./category.service.js";


async function getAll(req, res, next) {
    try {
        const categories = await getCategories();

        res.status(200).json({
            success: true,
            data: {
                categories,
            },
        });
    } catch (error) {
        next(error);
    }
}

async function getOne(req, res, next) {
    try {

        const category = await getCategoryById(req.params.id);

        if (!category) {
            return res.status(404).json({
                success: false,
                message: "Category not found",
            });
        }

        res.status(200).json({
            success: true,
            data: {
                category,
            },
        });
    } catch (error) {
        next(error);
    }
}

async function create(req, res, next) {
    try {
        const category = await createCategory(req.body);

        res.status(201).json({
            success: true,
            data: {
                category,
            },
        });
    } catch (error) {
        next(error);
    }
}

async function update(req, res, next) {
    try {
        const category = await updateCategory(req.params.id, req.body);

        if (!category) {
            return res.status(404).json({
                success: false,
                message: "Category not found",
            });
        }

        res.status(200).json({
            success: true,
            data: {
                category,
            },
        });
    } catch (error) {
        next(error);
    }
}

async function remove(req, res, next) {
    try {

        const category = await deleteCategory(req.params.id);

        if (!category) {
            return res.status(404).json({
                success: false,
                message: "Category not found",
            });
        }

        res.status(204).send()
    } catch (error) {
        next(error);
    }
}

export { getAll, getOne, create, update, remove };
