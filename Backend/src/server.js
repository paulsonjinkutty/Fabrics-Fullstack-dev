console.log("server.js started");
const cors = require("cors");
const express = require("express");
const customerRoutes = require("./routes/customerRoutes");
const employeeRoutes = require("./routes/employeeRoutes");
const inventoryRoutes = require("./routes/inventoryRoutes");
const ordersRoutes = require("./routes/ordersRoutes");
const paymentRoutes = require("./routes/paymentRoutes");
const supplierRoutes = require("./routes/supplierRoutes");
const categoryRoutes = require("./routes/categoryRoutes");
const product_variantsRoutes = require("./routes/product_variantsRoutes");
const productsRoutes = require("./routes/productsRoutes");

const app = express();

app.use(express.json());
app.use(cors({
    origin: "http://localhost:5173",
}));

app.use("/customers", customerRoutes);
app.use("/employees", employeeRoutes);
app.use("/inventory", inventoryRoutes);
app.use("/orders", ordersRoutes);
app.use("/payments", paymentRoutes);
app.use("/suppliers", supplierRoutes);
app.use("/categories", categoryRoutes);
app.use("/product_variants", product_variantsRoutes);
app.use("/products", productsRoutes);

// Test route
app.get("/", (req, res) => {
    res.send("🚀 Fabrics Backend is Running");
});


const PORT = 3000;
app.listen(PORT, () => {
    console.log(`Server running at http://localhost:${PORT}`);
});


