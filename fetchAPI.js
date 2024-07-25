async function fetchData(apiUrl) {
    try {
        const response = await fetch(apiUrl);
        const data = await response.json();

        const units = data.units;

        const results = units.map((unit) => {
            const competitorsList1 = unit.competitors[0];
            const competitorsList2 = unit.competitors[1];

            const olympicDay = unit.olympicDay;
            const disciplineName = unit.disciplineName;
            const eventUnitName = unit.eventUnitName;
            const startDate = unit.startDate;
            const endDate = unit.endDate;
            const name1 = competitorsList1.name;
            const name2 = competitorsList2.name;

            const parsedStartDate = new Date(startDate);
            const parsedEndDate = new Date(endDate);

            parsedStartDate.setHours(parsedStartDate.getHours());
            parsedEndDate.setHours(parsedEndDate.getHours());

            const formatTimeStartDate = parsedStartDate.toTimeString().slice(0, 5);
            const formatTimeEndDate = parsedEndDate.toTimeString().slice(0, 5);

            return {
                olympicDay,
                disciplineName,
                eventUnitName,
                formatTimeStartDate,
                formatTimeEndDate,
                name1,
                name2
            };
        });

        return results;
    } catch (error) {
        console.error("Error fetching data:", error);
        return null;
    }
}

module.exports = { fetchData };