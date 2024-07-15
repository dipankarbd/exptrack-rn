import { Account, Category } from '../store';

export const extractAccountNames = (accounts: Account[]) => {
  const dictionary: { [key: string]: string } = {};

  for (let account of accounts) {
    dictionary[account.id] = account.name;
  }

  return dictionary;
};

export const createCategoryLabels = (
  categories?: Category[],
): undefined | { value: number; label: string }[] => {
  if (categories) {
    const parentCategories: { [key: number]: Category } = {};

    for (let cat of categories) {
      if (cat.parentId == null) {
        parentCategories[cat.id] = cat;
      }
    }

    const res = [];

    for (let cat of categories) {
      if (cat.parentId) {
        const label = parentCategories[cat.parentId]
          ? `${parentCategories[cat.parentId].name} - ${cat.name}`
          : 'Unknown';
        res.push({
          value: cat.id,
          label: label,
        });
      }
    }

    return res;
  }

  return undefined;
};
