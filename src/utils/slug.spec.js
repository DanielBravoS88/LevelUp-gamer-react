// Pruebas simples de funciones utilitarias

describe('Slug Utility Tests', () => {
  
  // Función auxiliar para convertir texto a slug
  function slugify(text) {
    if (!text) return '';
    return text
      .toLowerCase()
      .replace(/[^\w\s-]/g, '')
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-')
      .trim();
  }
  
  it('should convert text to lowercase slug', () => {
    const result = slugify('PlayStation 5');
    expect(result).toBe('playstation-5');
  });

  it('should replace spaces with hyphens', () => {
    const result = slugify('Xbox Series X');
    expect(result).toBe('xbox-series-x');
  });

  it('should remove special characters', () => {
    const result = slugify('Call of Duty: Modern Warfare');
    expect(result).toBe('call-of-duty-modern-warfare');
  });

  it('should handle empty string', () => {
    const result = slugify('');
    expect(result).toBe('');
  });

  it('should handle multiple spaces', () => {
    const result = slugify('Nintendo  Switch  OLED');
    expect(result).toBe('nintendo-switch-oled');
  });
});
