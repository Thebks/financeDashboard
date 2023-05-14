import mongoose from "mongoose";
import { loadType } from "mongoose-currency";

// const Schema = mongoose.Schema;
loadType(mongoose);

// TRANSACTIONS SCHEMA

// const TransactionSchema = new mongoose.Schema(
//     {
//         buyer: {
//             type: String,
//             required: true,
//         },
//         amount: {
//             type: mongoose.Types.Currency,
//             currency: "USD",
//             get: (v) => v / 100,
//         },
//         productIds: [{
//             type: mongoose.Schema.Types.ObjectId,
//             ref: "Product",
//         }],
//     },
//     { timestamps: true, toJSON: { getters: true } }
// );

// PRODUCTS SCHEMA

const ProductSchema = new mongoose.Schema(
    {
        price: {
            type: mongoose.Types.Currency,
            currency: "USD",
            get: (v) => v / 100,
        },
        expense: {
            type: mongoose.Types.Currency,
            currency: "USD",
            get: (v) => v / 100,
        },
        transactions: [{
            type: mongoose.Schema.Types.ObjectId,
            ref: "Transaction",
        }],
    },
    { timestamps: true, toJSON: { getters: true } }
);

const Product = mongoose.model("Product", ProductSchema);

export default Product;


// const Transaction = mongoose.model("Transaction", TransactionSchema);
// const Product = mongoose.models.Product || mongoose.model("Product", ProductSchema);
// const Transaction = mongoose.models.Transaction || mongoose.model("Transaction", TransactionSchema);


// export default { Product, Transaction };