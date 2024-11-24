export function validate_common_fields(item) {
    const is_valid_description = item.description && item.description.trim().length > 0;
    const amount = Number(item.amount);
    const is_valid_amount = !isNaN(amount) && amount > 0;
    const is_valid_date = !isNaN(new Date(item.date).getTime());
    return is_valid_description && is_valid_amount && is_valid_date;
}