(
    function () {
        var tableauConnector = tableau.makeConnector();

        tableauConnector.getSchema = function (schemaCallback) {
            var cols = [{
                    id: "WorkOrderId",
                    dataType: tableau.dataTypeEnum.int
                }, {
                    id: "Reason",
                    dataType: tableau.dataTypeEnum.string
                }, {
                    id: "TargetDate",
                    dataType: tableau.dataTypeEnum.datetime
                }, {
                    id: "Instructions",
                    dataType: tableau.dataTypeEnum.string
                },
                {
                    id: "HasWarranty",
                    dataType: tableau.dataTypeEnum.bool
                }
            ];

            var tableSchema = {
                id: "WorkOrder",
                columns: cols
            };

            schemaCallback([tableSchema]);
        };

        tableauConnector.getData = function (table, doneCallback) {
            var data = [];

            // Iterate over the JSON object
            for (var i = 0; i <= 10; i++) {
                data.push({
                    "WorkOrderId": i,
                    "Reason": "Reason " + i.toString(),
                    "TargetDate": "04/" + i.toString() + "/2020",
                    "Instructions": "Instructions " + i.toString(),
                    "HasWarranty": i % 2 == 0 ? true : false
                });
            }

            table.appendRows(data);
            doneCallback();
        };

        tableau.registerConnector(tableauConnector);

        $(document).ready(function () {
            $("#btnConnect").click(function () {
                // This will be the data source name in Tableau
                tableau.connectionName = "WorkOrder Data";

                // This sends the connector object to Tableau
                tableau.submit();
            });
        });
    }
)();