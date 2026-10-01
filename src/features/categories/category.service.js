import Category from "./category.module.js";

function getCategories() {

    const categories = Category.find().sort({ createdAt: -1 })

	return categories;
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
