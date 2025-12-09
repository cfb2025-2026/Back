# 📚 API Documentation

## 🔑 Authentification

Toutes les routes protégées nécessitent un **token Bearer** dans l'en-tête :

- Si le token est absent ou invalide → **401 Unauthorized**
- Certaines routes nécessitent un rôle **admin** → sinon **403 Forbidden**

---

## 🛒 Products

| Méthode | URL                 | Accès                     | Body                                                                                        | Réponse                                                              |
| ------- | ------------------- | ------------------------- | ------------------------------------------------------------------------------------------- | -------------------------------------------------------------------- |
| GET     | `/api/products`     | Tout utilisateur connecté | -                                                                                           | 200 JSON tableau produits                                            |
| GET     | `/api/products/:id` | Tout utilisateur connecté | -                                                                                           | 200 JSON produit / 404 Not Found                                     |
| POST    | `/api/products`     | Admin                     | `{ name: string, price: number, img_url?: string, seller_id?: number, review_id?: number }` | 201 JSON produit / 403 Forbidden                                     |
| PUT     | `/api/products/:id` | Admin                     | `{ name?, price?, img_url?, seller_id?, review_id? }`                                       | 200 JSON produit mis à jour / 403 Forbidden / 404 Not Found          |
| DELETE  | `/api/products/:id` | Admin                     | -                                                                                           | 200 `{ message: "Product deleted" }` / 403 Forbidden / 404 Not Found |

---

## 👤 Users

| Méthode | URL              | Accès                         | Body                                  | Réponse                                                           |
| ------- | ---------------- | ----------------------------- | ------------------------------------- | ----------------------------------------------------------------- |
| GET     | `/api/users`     | Connecté (admin conseillé)    | -                                     | 200 JSON tableau utilisateurs                                     |
| GET     | `/api/users/:id` | Connecté                      | -                                     | 200 JSON utilisateur / 404 Not Found                              |
| POST    | `/api/users`     | Admin                         | `{ name, email, password, role? }`    | 201 JSON utilisateur / 403 Forbidden                              |
| PUT     | `/api/users/:id` | Admin ou utilisateur lui-même | `{ name?, email?, password?, role? }` | 200 JSON utilisateur / 403 Forbidden / 404 Not Found              |
| DELETE  | `/api/users/:id` | Admin                         | -                                     | 200 `{ message: "User deleted" }` / 403 Forbidden / 404 Not Found |

---

## 🛡 Roles

| Méthode | URL          | Accès    | Body                                   | Réponse                       |
| ------- | ------------ | -------- | -------------------------------------- | ----------------------------- |
| GET     | `/api/roles` | Connecté | -                                      | 200 JSON tableau rôles        |
| POST    | `/api/roles` | Admin    | `{ admin_id?, seller_id?, buyer_id? }` | 201 JSON rôle / 403 Forbidden |

---

## 📦 Orders / Commands

| Méthode | URL               | Accès                 | Body                                | Réponse                                                            |
| ------- | ----------------- | --------------------- | ----------------------------------- | ------------------------------------------------------------------ |
| GET     | `/api/orders`     | Admin ou propriétaire | -                                   | 200 JSON tableau commandes                                         |
| POST    | `/api/orders`     | Connecté              | `{ user_id, total_price, status? }` | 201 JSON commande / 401 Unauthorized                               |
| PUT     | `/api/orders/:id` | Admin ou propriétaire | `{ total_price?, status? }`         | 200 JSON commande mise à jour / 403 Forbidden / 404 Not Found      |
| DELETE  | `/api/orders/:id` | Admin ou propriétaire | -                                   | 200 `{ message: "Order deleted" }` / 403 Forbidden / 404 Not Found |

---

## 🛍 Product in Order

| Méthode | URL                   | Accès | Body                       | Réponse                                     |
| ------- | --------------------- | ----- | -------------------------- | ------------------------------------------- |
| POST    | `/api/productinorder` | Admin | `{ product_id, order_id }` | 201 JSON / 403 Forbidden / 401 Unauthorized |

---

## 🛒 Carts

| Méthode | URL              | Accès                                 | Body           | Réponse                           |
| ------- | ---------------- | ------------------------------------- | -------------- | --------------------------------- |
| GET     | `/api/carts`     | Connecté (admin si tu veux voir tous) | -              | 200 JSON tableau paniers          |
| GET     | `/api/carts/:id` | Connecté                              | -              | 200 JSON panier / 404 Not Found   |
| POST    | `/api/carts`     | Connecté                              | `{ user_id }`  | 201 JSON panier                   |
| PUT     | `/api/carts/:id` | Connecté                              | `{ user_id? }` | 200 JSON panier mis à jour        |
| DELETE  | `/api/carts/:id` | Connecté                              | -              | 200 `{ message: "Cart deleted" }` |

---

## 🛒 Cart Items

| Méthode | URL             | Accès    | Body                   | Réponse                     |
| ------- | --------------- | -------- | ---------------------- | --------------------------- |
| POST    | `/api/cartitem` | Connecté | `{ cart_id, item_id }` | 201 JSON / 401 Unauthorized |

---

## 🏷 Product Attribute Category

| Méthode | URL                             | Accès                      | Body                                        | Réponse                     |
| ------- | ------------------------------- | -------------------------- | ------------------------------------------- | --------------------------- |
| POST    | `/api/productattributecategory` | Connecté (admin conseillé) | `{ product_id, attribute_id, category_id }` | 201 JSON / 401 Unauthorized |

---

## 🧩 Items

| Méthode | URL          | Accès    | Body                             | Réponse                          |
| ------- | ------------ | -------- | -------------------------------- | -------------------------------- |
| GET     | `/api/items` | Connecté | -                                | 200 JSON tableau items           |
| POST    | `/api/items` | Connecté | `{ name, quantity, product_id }` | 201 JSON item / 401 Unauthorized |

---

## 🔗 Notes générales

- Toutes les routes utilisent le **JSON** pour le corps des requêtes et les réponses.
- **Erreur serveur** → 500 avec `{ error: message }`.
- **Paramètres ID** → doivent être numériques (`/api/products/1`) sauf indication contraire.
