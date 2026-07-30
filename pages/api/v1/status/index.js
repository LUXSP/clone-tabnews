function status(request, response) {
  response.status(200).json({ Resposta: "Deu certo!" });
}

export default status;
