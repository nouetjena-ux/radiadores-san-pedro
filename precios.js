/* ═══════════════════════════════════════════════════════════════
   PRECIOS — Radiadores San Pedro
   ═══════════════════════════════════════════════════════════════
   Acá se cargan los precios de los productos de la tienda.
   Los productos SIN precio muestran "Consultar precio" y el cliente
   pregunta por WhatsApp. Los productos CON precio se pueden agregar
   al carrito y comprar directo.

   ¿Cómo cargar un precio?
   1. Abrí la tienda (catalogo.html) y buscá el producto.
   2. El ID aparece abajo de cada tarjeta (ej: r32-0).
   3. Agregá una línea acá adentro:  "ID": PRECIO,

   Ejemplo:
   const PRECIOS = {
     "r32-0": 95000,      // Batería 12x45
     "p2-0": 45000,       // Kit cardán HPL601
   };
════════════════════════════════════════════════════════════════ */

const PRECIOS = {
  // "r32-0": 95000,
};

/* Configuración general de la tienda */
const CONFIG = {
  whatsapp: "5493329684352",
  // Si tenés un link de pago de Mercado Pago, pegalo acá para mostrarlo
  // en el carrito (ej: "https://link.mercadopago.com.ar/radiadoressanpedro")
  mercadopago: "",
};
