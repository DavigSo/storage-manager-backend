import Item from "../models/Item.js";

export async function listItems(req, res) {
  const items = await Item.find();
  res.json(items);
}

export async function getItem(req, res) {
  const item = await Item.findById(req.params.id);
  if (!item) return res.status(404).json({ error: "Item não encontrado" });
  res.json(item);
}

export async function createItem(req, res) {
  try {
    const { name, category, gender, quantity, minimumStock } = req.body;
    const newItem = new Item({
      name,
      category,
      gender,
      quantity,
      minimumStock,
    });
    await newItem.save();
    res.status(201).json(newItem);
  } catch (err) {
    res.status(400).json({ error: "Erro ao criar item", details: err.message });
  }
}

export async function updateItem(req, res) {
  try {
    const item = await Item.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!item) return res.status(404).json({ error: "Item não encontrado" });
    res.json(item);
  } catch (err) {
    res
      .status(400)
      .json({ error: "Erro ao atualizar item", details: err.message });
  }
}

export async function deleteItem(req, res) {
  const item = await Item.findByIdAndDelete(req.params.id);
  if (!item) return res.status(404).json({ error: "Item não encontrado" });
  res.json({ message: "Item deletado com sucesso" });
}
