from fastapi import APIRouter
import json
import requests
import os

router = APIRouter()


@router.post("/zipcode")
def zipcode_request(zip_code, radius):
    headers = {"apikey": os.environ.get("ZIPCODE_API_KEY")}
    params = (
        ("code", zip_code),
        ("radius", radius),
        ("country", "us"),
    )

    response = requests.get(
        "https://app.zipcodebase.com/api/v1/radius",
        headers=headers,
        params=params,
    )
    zipcode_list = []
    try:
        zip = response.text
        zip = json.loads(zip)

        zip = zip["results"]
        for i in zip:
            zipcode_list.append(i["code"])
        zipcode_list = json.dumps(zipcode_list)
        return zipcode_list
    except KeyError:
        return json.loads("[]")


@router.get("/zenquotes")
def zen_quote():
    response = requests.get("https://zenquotes.io/api/random")
    quote = json.loads(response.text)
    quote = '"' + quote[0]["q"] + '" - ' + quote[0]["a"]
    return quote
