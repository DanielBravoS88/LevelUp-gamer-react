describe('Shopping Cart Logic Tests', () => {
  
  describe('Cart Calculations', () => {
    it('should calculate subtotal correctly', () => {
      const cart = [
        { name: 'PS5', price: 599990, qty: 1 },
        { name: 'Controller', price: 59990, qty: 2 }
      ];
      
      const subtotal = cart.reduce((sum, item) => sum + (item.price * item.qty), 0);
      
      expect(subtotal).toBe(719970);
    });

    it('should apply DUOC discount (20%)', () => {
      const subtotal = 100000;
      const isDuoc = true;
      const discount = isDuoc ? Math.round(subtotal * 0.2) : 0;
      
      expect(discount).toBe(20000);
    });

    it('should not apply discount for non-DUOC email', () => {
      const subtotal = 100000;
      const isDuoc = false;
      const discount = isDuoc ? Math.round(subtotal * 0.2) : 0;
      
      expect(discount).toBe(0);
    });

    it('should calculate total with discount', () => {
      const subtotal = 100000;
      const discount = 20000;
      const total = subtotal - discount;
      
      expect(total).toBe(80000);
    });
  });

  describe('Cart Item Management', () => {
    it('should add item to cart', () => {
      const cart = [];
      const newItem = { name: 'Nintendo Switch', price: 299990, qty: 1 };
      
      cart.push(newItem);
      
      expect(cart.length).toBe(1);
      expect(cart[0].name).toBe('Nintendo Switch');
    });

    it('should increment quantity of existing item', () => {
      const item = { name: 'Game', price: 49990, qty: 1 };
      item.qty += 1;
      
      expect(item.qty).toBe(2);
    });

    it('should calculate cart quantity total', () => {
      const cart = [
        { name: 'Item1', qty: 2 },
        { name: 'Item2', qty: 3 },
        { name: 'Item3', qty: 1 }
      ];
      
      const totalQty = cart.reduce((sum, item) => sum + item.qty, 0);
      
      expect(totalQty).toBe(6);
    });
  });

  describe('Email Validation', () => {
    it('should validate DUOC email format', () => {
      const duocEmail = 'student@duoc.cl';
      const regularEmail = 'user@gmail.com';
      
      const isDuoc = /@duoc\.cl$/.test(duocEmail);
      const isNotDuoc = /@duoc\.cl$/.test(regularEmail);
      
      expect(isDuoc).toBe(true);
      expect(isNotDuoc).toBe(false);
    });

    it('should validate age requirement (18+)', () => {
      const validAge = 25;
      const invalidAge = 16;
      
      expect(validAge >= 18).toBe(true);
      expect(invalidAge >= 18).toBe(false);
    });
  });
});
