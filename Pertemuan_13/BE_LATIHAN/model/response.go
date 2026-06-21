package model

type Response struct {
	Message string      `json:"message" example:"detail pesan"`
	Data    interface{} `json:"data,omitempty"`
	Error   string      `json:"error,omitempty" example:"detail error"`
}

type Error401Response struct {
	Message string `json:"message" example:"unauthorized"`
	Error   string `json:"error,omitempty" example:"token tidak valid atau tidak ditemukan"`
}

type Error403Response struct {
	Message string `json:"message" example:"user tidak memiliki akses untuk fitur ini"`
}

type Success200Response struct {
	Message string      `json:"message" example:"berhasil"`
	Data    interface{} `json:"data,omitempty"`
}

type Success201Response struct {
	Message string      `json:"message" example:"berhasil ditambahkan"`
	Data    interface{} `json:"data,omitempty"`
}