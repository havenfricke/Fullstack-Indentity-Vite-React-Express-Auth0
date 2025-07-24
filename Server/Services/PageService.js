const pageRepository = require('../Repositories/PageRepository');
const Page = require('../Models/Page');
const IdGen = require('../Utils/IdGen');

async function getAllPages(queryParams) {
  const pages = await pageRepository.getAllPages(queryParams);
  return pages.map(pages => new Page(pages.id, pages.name));
}

async function getPageById(id) {
  const page = await pageRepository.getPageById(id);
  if (!page) {
    throw new Error('Page not found');
  }
  return new Page(page.id, page.name);
}

async function createPage(body) {
  const created = await pageRepository.createPage(id = IdGen.getId(), body);
  return new Page(created.id, created.name);
}

async function editPage(update) {
  const original = await pageRepository.getPageById(update.id);
  if (!original) {
    throw new Error("Page not found");
  }

  const updatedPage = {
    name: update.name ? update.name : original.name
    // Add other page props here and use ternary to update
  };

  const updated = await pageRepository.editPage(update.id, updatedPage);
  return new Page(updated.id, updated.name);
}

async function deletePage(id) {
  const original = await pageRepository.getPageById(id);
  if (!original) {
    throw new Error("Page not found");
  }
  await pageRepository.deletePage(id);
  return { message: "Page deleted successfully" };
}

module.exports = {
  getAllPages,
  getPageById,
  createPage,
  editPage,
  deletePage
};

// the service layer acts as the heart of your 
// application by housing the business logic, 
// making it easier to manage, test, and evolve 
// the application in line with business needs.
