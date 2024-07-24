async function fetchData() {
    try {
        const response = await fetch("https://sph-s-api.olympics.com/summer/schedules/api/POR/schedule/day/2024-07-24");
        const data = await response.json();

        const units = data.units;
        const unit = units[0]; // Assuming you want the first unit's data

        const disciplineName = unit.disciplineName;
        const eventUnitName = unit.eventUnitName;
        const startDate = unit.startDate;
        const endDate = unit.endDate;

        const result = {
            disciplineName,
            eventUnitName,
            startDate,
            endDate
        };

        return result;
    } catch (error) {
        console.error("Error fetching data:", error);
        return null;
    }
}

module.exports = { fetchData };