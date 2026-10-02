import mongoose from "mongoose";
import {
    getCategories,
    getCategoryById,
    createCategory,
    updateCategory,
    deleteCategory,
} from "./category.service.js";

import paginationSchema from "../../utils/paginationValidation.js";

async function getAll(req, res, next) {
    try {

        const { page = 1, limit = 10 } = req.query

        const result = paginationSchema.safeParse({ page, limit });

        if (!result.success) {
           return next(result.error)
        }

        const { categories, meta } = await getCategories({ page, limit });

        res.status(200).json({
            success: true,
            data: {
                categories,
            },
            meta
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
