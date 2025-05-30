import Item from "../models/Item.js";

export async function listItems(req, res) {
  console.log("🔍 listItems foi invocado");
  try {
    const items = await Item.find().lean().exec();
    return res.json(items);
  } catch (err) {
    console.error("🔥 Erro em listItems:", err);
    return res.status(500).json({
      error: "Erro interno ao listar itens",
      details: err.message,
    });
  }
}

export async function getItem(req, res) {
  try {
    const item = await Item.findById(req.params.id).lean().exec();
    if (!item) return res.status(404).json({ error: "Item não encontrado" });
    res.json(item);
  } catch (err) {
    console.error("🔥 Erro em getItem:", err);
    res
      .status(500)
      .json({ error: "Erro interno ao obter item", details: err.message });
  }
}

export async function createItem(req, res) {
  try {
    const { name, category, gender, quantity, minimumStock, expirationDate } =
      req.body;
    const newItem = new Item({
      name,
      category,
      gender,
      quantity,
      minimumStock,
      expirationDate,
    });
    await newItem.save();
    res.status(201).json(newItem);
  } catch (err) {
    console.error("🔥 Erro em createItem:", err);
    res.status(400).json({ error: "Erro ao criar item", details: err.message });
  }
}

export async function updateItem(req, res) {
  try {
    const updated = await Item.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    })
      .lean()
      .exec();
    if (!updated) return res.status(404).json({ error: "Item não encontrado" });
    res.json(updated);
  } catch (err) {
    console.error("🔥 Erro em updateItem:", err);
    res
      .status(400)
      .json({ error: "Erro ao atualizar item", details: err.message });
  }
}

export async function deleteItem(req, res) {
  try {
    const deleted = await Item.findByIdAndDelete(req.params.id).lean().exec();
    if (!deleted) return res.status(404).json({ error: "Item não encontrado" });
    res.json({ message: "Item deletado com sucesso" });
  } catch (err) {
    console.error("🔥 Erro em deleteItem:", err);
    res
      .status(500)
      .json({ error: "Erro interno ao deletar item", details: err.message });
  }
}
