(
    function () {
        var tableauConnector = tableau.makeConnector();

        tableauConnector.init = function (initCallback) {
            tableau.authType = tableau.authTypeEnum.basic;
            initCallback();
        }

        tableauConnector.getSchema = function (schemaCallback) {
            var cols = [{
                    id: "Id",
                    dataType: tableau.dataTypeEnum.int
                }, {
                    id: "Summary",
                    dataType: tableau.dataTypeEnum.string
                },
                {
                    id: "RecordType",
                    dataType: tableau.dataTypeEnum.string
                },
                {
                    id: "SiteName",
                    dataType: tableau.dataTypeEnum.string
                },
                {
                    id: "City",
                    dataType: tableau.dataTypeEnum.string
                }
            ];

            var tableSchema = {
                id: "ServiceTickets",
                columns: cols
            };

            schemaCallback([tableSchema]);
        };

        tableauConnector.getData = function (table, doneCallback) {
            var data = [];

            $.ajax({
                type: "GET",
                url: "http://na.myconnectwise.net/v4_6_release/apis/3.0/service/tickets",
                dataType: 'json',
                headers: {
                    "Authorization": "Basic ZGlyZWN0YXV0bytoSUxuWTNtbXA5TUpYc2J2OkNVYUJ6Rmp4bGtuQmplM1Y=",
                    "clientId": "6e2d20c9-d02e-4b4f-b11d-ae27f0533506"
                },
                success: function (responseData) {
                    if (responseData != null) {
                        responseData.forEach(rd => {
                            var ticket = {};
                            ticket.Id = rd.id;
                            ticket.Summary = rd.summary;
                            ticket.RecordType = rd.recordType;
                            ticket.SiteName = rd.siteName;
                            ticket.City = rd.city;
                            data.push(ticket);
                        });
                    }

                    table.appendRows(data);
                    doneCallback();
                }
            });
        };

        tableau.registerConnector(tableauConnector);

        $(document).ready(function () {
            $("#btnConnect").click(function () {
                // This will be the data source name in Tableau
                tableau.connectionName = "Service Tickets Data";

                // This sends the connector object to Tableau
                tableau.submit();
            });
        });
    }
)();