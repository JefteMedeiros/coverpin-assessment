export function nameFormatter(name: string) {
	const nameParts = name.split(" ");
	if (nameParts.length < 2) return name;

	const firstName = nameParts[0];
	const lastName = nameParts[nameParts.length - 1];

	const formattedFirstName = firstName.charAt(0).toUpperCase() + firstName.slice(1).toLowerCase();
	const lastInitial = lastName.charAt(0).toUpperCase();

	return `${formattedFirstName} ${lastInitial}.`;
}
