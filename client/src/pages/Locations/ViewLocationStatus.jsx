import { Box, Button } from "@mui/material";
import { useState, useEffect, useContext } from "react";
import http from "../../http";
import UserContext from "../../contexts/UserContext";

function ViewLocationStatus(props) {
    const { user } = useContext(UserContext);
    const [locationList, setLocationList] = useState([]);

    useEffect(() => {
        fetchLocations();
    }, []);

    const fetchLocations = async () => {
        try {
            const response = await http.get("locations/LocationsMain");
            setLocationList(response.data);
        } catch (error) {
            console.error("Error fetching locations:", error);
        }
    };

    return (
        <Box className="mx-10 items-center">
            <h1 className="text-4xl font-bold mt-8 mb-6 text-white text-center">
                View Charger Status
            </h1>
            <div className="mx-auto">
                <table className="w-3/4 mx-auto rounded-lg overflow-hidden">
                    <thead>
                        <tr className="text-white">
                            <th className="text-left p-2">Location Name</th>
                            <th className="text-left p-2">Street Name</th>
                            <th className="text-left p-2">Postal Code</th>
                            <th className="text-left p-2">Number of Chargers</th>
                            <th className="text-left p-2">Description</th>
                            <th className="text-left p-2">Status</th>
                        </tr>
                    </thead>
                    <tbody>
                        {locationList.map((location, key) => (
                            <tr key={key} className="bg-gray-200">
                                <td className="p-2">{location.locationName}</td>
                                <td className="p-2">{location.streetName}</td>
                                <td className="p-2">Singapore {location.postalCode}</td>
                                <td className="p-2">{location.noOfChargers}</td>
                                <td className="p-2">{location.description}</td>
                                <td className="p-2">
                                    <div className="ml-5"
                                        style={{
                                            width: "15px",
                                            height: "15px",
                                            borderRadius: "50%",
                                            backgroundColor: location.status ? "green" : "red"
                                        }}
                                    />
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>
        </Box>
    );
}

export default ViewLocationStatus;
