async function fetchData() {
    try {
        const response = await fetch("https://sph-s-api.olympics.com/summer/schedules/api/POR/schedule/day/2024-07-25");
        const data = await response.json();

        const units = data.units;
        const unit = units[0];
        const competitorsList1 = unit.competitors[0];
        const competitorsList2 = unit.competitors[1];

        const olympicDay = unit.olympicDay;
        const disciplineName = unit.disciplineName;
        const eventUnitName = unit.eventUnitName;
        const startDate = unit.startDate;
        const endDate = unit.endDate;
        const name1 = competitorsList1.name;
        const name2 = competitorsList2.name;

        const timeSplitStartDate = startDate.split("T")[1].split(":");
        const afterSplitStartDate = `${timeSplitStartDate[0]}:${timeSplitStartDate[1]}`;
        const formatTimeStartDate = afterSplitStartDate.slice(0, 5);

        const timeSplitEndDate = endDate.split("T")[1].split(":");
        const afterSplitEndDate = `${timeSplitEndDate[0]}:${timeSplitEndDate[1]}`;
        const formatTimeEndDate = afterSplitEndDate.slice(0, 5);

        const result = {
            olympicDay,
            disciplineName,
            eventUnitName,
            formatTimeStartDate,
            formatTimeEndDate,
            name1,
            name2
        };

        return result;
    } catch (error) {
        console.error("Error fetching data:", error);
        return null;
    }
}

module.exports = { fetchData };