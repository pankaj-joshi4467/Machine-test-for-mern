import { parse } from 'csv-parse/sync';
import xlsx from 'xlsx';
function mapRowToStandard(row) {
  const keyMap = {};
  for (const k of Object.keys(row)) {
    keyMap[k.toLowerCase().trim()] = k;
  }
  const pick = (...candidates) => {
    for (const c of candidates) {
      const key = keyMap[c.toLowerCase()];
      if (key && row[key] !== undefined && row[key] !== null && row[key].toString().trim() !== '') {
        return row[key].toString().trim();
      }
    }
    return null;
  };
  const firstName = pick('firstname','first name','name','full name','fullname') || Object.values(row)[0] || '';
  const phone = pick('phone','mobile','mobile no','mobileno','contact','phone number','telephone') || Object.values(row)[1] || '';
  const notes = pick('notes','note','remarks','comment','comments') || Object.values(row)[2] || '';
  return { FirstName: firstName || '', Phone: phone ? phone.toString().replace(/\s+/g,'') : '', Notes: notes || '' };
}
export async function parseCSVBuffer(buffer) {
  const text = buffer.toString('utf-8');
  const records = parse(text, { columns: true, skip_empty_lines: true });
  return records.map(r => mapRowToStandard(r));
}
export async function parseExcelBuffer(buffer) {
  const wb = xlsx.read(buffer, { type: 'buffer' });
  const firstSheet = wb.SheetNames[0];
  const ws = wb.Sheets[firstSheet];
  const json = xlsx.utils.sheet_to_json(ws, { defval: '' });
  return json.map(r => mapRowToStandard(r));
}
