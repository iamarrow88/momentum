const asyncFunctions = {
  async getValue(url) {
    const response = await fetch(`${url}`);
    return {
      isOk: response.ok,
      json: await response.json()
    };
  }
}

export default asyncFunctions;