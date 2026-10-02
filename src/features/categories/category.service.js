import Category from "./category.module.js";

async function getCategories(metaData) {

	const { page, limit } = metaData
	const skip = (page - 1) * limit
	const categories = await Category.find().skip(skip).limit(limit).sort({ createdAt: -1 });
	const total = await Category.countDocuments();
	const totalPages = Math.ceil(total / limit)

	return {
		categories,
		meta: {
			page,
			limit,
			total,
			totalPages,
		}
	}
}

function getCategoryById(categoryId) {

    const category = Category.findById(categoryId);

	return category
}


function createCategory(categoryData) {

    const category = Category.create(categoryData)

	return category

}

function updateCategory(categoryId, categoryData) {
	const category = Category.findByIdAndUpdate(
		categoryId,
		categoryData,
		{ new: true, runValidators: true },
	);

    return category
}

function deleteCategory(categoryId) {
    const category = Category.findByIdAndDelete(categoryId);
	return category
}

export {
	getCategories,
	getCategoryById,
	createCategory,
	updateCategory,
	deleteCategory,
};
