export let fakeCoinsDB: any = [
    {
        "id": "621fcd41e23536204e045740",
        "coinNumber": 1,
        "program": "fakeProgramId",
        "name": "Maya Angelou",
        "year": 2022,
        "image": "",
    },
    {
        "id": "621fcd41e23536204e045741",
        "coinNumber": 2,
        "program": "fakeProgramId",
        "name": "Dr. Sally Ride",
        "year": 2022,
        "image": "",
    },
    {
        "id": "621fcd41e23536204e045742",
        "coinNumber": 3,
        "program": "fakeProgramId",
        "name": "Wilma Mankiller",
        "year": 2022,
        "image": "",
    }
];

export let fakeUserCoinsDB = ['621fcd41e23536204e045742', '621fcd41e23536204e045740'];

export let expectedCoinsResponse = [
    {
        "_id": "621fcd41e23536204e045740",
        "coinNumber": 1,
        "program": "fakeProgramId",
        "name": "Maya Angelou",
        "year": 2022,
        "image": "",
        "found": true
    },
    {
        "_id": "621fcd41e23536204e045741",
        "coinNumber": 2,
        "program": "fakeProgramId",
        "name": "Dr. Sally Ride",
        "year": 2022,
        "image": "",
        "found": false
    },
    {
        "_id": "621fcd41e23536204e045742",
        "coinNumber": 3,
        "program": "fakeProgramId",
        "name": "Wilma Mankiller",
        "year": 2022,
        "image": "",
        "found": true
    },
];