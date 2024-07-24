fetch("https://sph-s-api.olympics.com/summer/schedules/api/POR/schedule/day/2024-07-24")
    .then((response) => response.json())
    .then((data) => {
        const units = data.units;

        const disciplineName = units[0].disciplineName;
        const eventUnitName = units[0].eventUnitName;
        const startDate = units[0].startDate;
        const endDate = units[0].endDate;

        console.log("Esporte:", disciplineName,
            "\nModalidade:", eventUnitName,
            "\nHorário previsto:", startDate,
            "\nHorário de Encerramento:", endDate);
    })