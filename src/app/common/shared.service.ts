import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SharedService {

  constructor() { }

  hasSuspiciousContent(formValues: Record<string, any>): boolean {
    const combinedValues = Object.values(formValues).join(' ').toLowerCase();

    const suspiciousKeywords = [
      '<script', '</script', '<iframe', '<object', 'onclick', 'onerror', 'onload', "<>", "</>",
      'onmouseover', 'drop table', 'select *', 'insert into', 'javascript:', '<embed',
      'onclick=', 'onerror=', 'onload=', 'onmouseover=', 'onfocus=', 'alert(', 'eval(', 'document.cookie',
      '--', '/*', '*/', ';--', 'union select', 'delete from', 'update set',
      '<img', '<svg', '<xml', '<meta'
    ];

    const hasSuspiciousKeyword = suspiciousKeywords.some(keyword => combinedValues.includes(keyword));

    if (hasSuspiciousKeyword) {
      alert('Warning: Suspicious content detected in the form. Verify your input');
      return true;
    }

    return false;
  }
}
