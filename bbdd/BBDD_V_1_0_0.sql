#==========================================
# INSTALACION DE BASE DE DATOS PRESTAMOSBD
#------------------------------------------
# VERSION:  1_0_0
#==========================================

DROP DATABASE IF EXISTS prestamosbd;

#-------------------------------------------
# CREACION DE LA BASE DE DATOS
#-------------------------------------------

CREATE DATABASE prestamosbd
  CHARACTER SET utf8
        COLLATE utf8_general_ci;

USE prestamosbd;


CREATE TABLE t_metodos_pago
(
	id					INT(2)		NOT NULL AUTO_INCREMENT,
	descripcion			VARCHAR(64)	NOT NULL,
	
	PRIMARY KEY (id)

) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE t_estados_operaciones
(
	id					INT(2)		NOT NULL AUTO_INCREMENT,
	descripcion			VARCHAR(64)	NOT NULL,
	
	PRIMARY KEY (id)

) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE t_estados_prestamo
(
	id					INT(2)		NOT NULL AUTO_INCREMENT,
	descripcion			VARCHAR(64)	NOT NULL,
	
	PRIMARY KEY (id)

) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE t_clientes
(
	id					INT(4)		 NOT NULL AUTO_INCREMENT,
	nombre				VARCHAR(64)	 NOT NULL,
	apellidos			VARCHAR(128) ,
	comentario			VARCHAR(512) ,
	telefono			VARCHAR(16)  ,
	email				VARCHAR(128) ,
	created_by			VARCHAR(32)  NOT NULL,
	created_at			DATETIME		 NOT NULL,
	updated_by			VARCHAR(32)  NOT NULL,
	updated_at			DATETIME		 NOT NULL,	
	
	PRIMARY KEY (id)

) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE t_intermediarios
(
	id					INT(4)		 NOT NULL AUTO_INCREMENT,
	nombre				VARCHAR(64)	 NOT NULL,
	apellidos			VARCHAR(128) ,
	comentario			VARCHAR(512) ,
	telefono			VARCHAR(16)  ,
	email				VARCHAR(128) ,
	porc_comision		DECIMAL(4,2) NOT NULL,
	created_by			VARCHAR(32)  NOT NULL,
	created_at			DATETIME		 NOT NULL,
	updated_by			VARCHAR(32)  NOT NULL,
	updated_at			DATETIME		 NOT NULL,	
	
	PRIMARY KEY (id)

) ENGINE=InnoDB DEFAULT CHARSET=utf8;

CREATE TABLE t_prestamos
(
	id					INT(6)		 NOT NULL AUTO_INCREMENT,
	fecha_ini			DATE		 NOT NULL,
	fecha_fin			DATE		 NOT NULL,
	importe				DECIMAL(8,2) NOT NULL,
	importe_inicial		DECIMAL(8,2) NOT NULL,
	interes				DECIMAL(4,2) NOT NULL,
	cliente_id			INT(4)		 NOT NULL,
	intermediario_id	INT(4)		 ,
	estado_id			INT(2)		 NOT NULL,
	created_by			VARCHAR(32)  NOT NULL,
	created_at			DATETIME		 NOT NULL,
	updated_by			VARCHAR(32)  NOT NULL,
	updated_at			DATETIME		 NOT NULL,
	
	PRIMARY KEY (id)

) ENGINE=InnoDB DEFAULT CHARSET=utf8;

ALTER TABLE t_prestamos
	ADD CONSTRAINT fk_prestamos_clienteid
	FOREIGN KEY (cliente_id)
		REFERENCES t_clientes(id)
		ON DELETE NO ACTION
		ON UPDATE NO ACTION;
		
ALTER TABLE t_prestamos
	ADD CONSTRAINT fk_prestamos_intermediarioid
	FOREIGN KEY (intermediario_id)
		REFERENCES t_intermediarios(id)
		ON DELETE NO ACTION
		ON UPDATE NO ACTION;
		
ALTER TABLE t_prestamos
	ADD CONSTRAINT fk_prestamos_estadoid
	FOREIGN KEY (estado_id)
		REFERENCES t_estados_prestamo(id)
		ON DELETE NO ACTION
		ON UPDATE NO ACTION;

CREATE TABLE t_comentarios_prestamo
(
	id					INT(4)		 NOT NULL AUTO_INCREMENT,
	prestamo_id			INT(6)		 NOT NULL,
	comentario			VARCHAR(512) NOT NULL,
	fecha				DATE		 NOT NULL,
	created_by			VARCHAR(32)  NOT NULL,
	created_at			DATETIME		 NOT NULL,
	updated_by			VARCHAR(32)  NOT NULL,
	updated_at			DATETIME		 NOT NULL,	
	
	PRIMARY KEY (id)

) ENGINE=InnoDB DEFAULT CHARSET=utf8;

ALTER TABLE t_comentarios_prestamo
	ADD CONSTRAINT fk_comentariosprestamo_prestamoId
	FOREIGN KEY (prestamo_id)
		REFERENCES t_prestamos(id)
		ON DELETE NO ACTION
		ON UPDATE NO ACTION;
		
CREATE TABLE t_operaciones
(
	id					INT(8)		 NOT NULL AUTO_INCREMENT,
	prestamo_id			INT(6)		 NOT NULL,
	fecha				DATE		 NOT NULL,
	importe				DECIMAL(8,2) NOT NULL,
	metodo_id			INT(2)		 NOT NULL,
	estado_id			INT(2)		 NOT NULL,
	created_by			VARCHAR(32)  NOT NULL,
	created_at			DATETIME		 NOT NULL,
	updated_by			VARCHAR(32)  NOT NULL,
	updated_at			DATETIME		 NOT NULL,	
	
	PRIMARY KEY (id)

) ENGINE=InnoDB DEFAULT CHARSET=utf8;

ALTER TABLE t_operaciones
	ADD CONSTRAINT fk_operaciones_prestamoId
	FOREIGN KEY (prestamo_id)
		REFERENCES t_prestamos(id)
		ON DELETE NO ACTION
		ON UPDATE NO ACTION;
		
ALTER TABLE t_operaciones
	ADD CONSTRAINT fk_operaciones_metodoId
	FOREIGN KEY (metodo_id)
		REFERENCES t_metodos_pago(id)
		ON DELETE NO ACTION
		ON UPDATE NO ACTION;
		
ALTER TABLE t_operaciones
	ADD CONSTRAINT fk_operaciones_estadoId
	FOREIGN KEY (estado_id)
		REFERENCES t_estados_operaciones(id)
		ON DELETE NO ACTION
		ON UPDATE NO ACTION;
		
CREATE TABLE t_comentarios_operacion
(
	id					INT(4)		 NOT NULL AUTO_INCREMENT,
	operacion_id		INT(6)		 NOT NULL,
	comentario			VARCHAR(512) NOT NULL,
	fecha				DATE		 NOT NULL,
	created_by			VARCHAR(32)  NOT NULL,
	created_at			DATETIME		 NOT NULL,
	updated_by			VARCHAR(32)  NOT NULL,
	updated_at			DATETIME		 NOT NULL,	
	
	PRIMARY KEY (id)

) ENGINE=InnoDB DEFAULT CHARSET=utf8;

ALTER TABLE t_comentarios_operacion
	ADD CONSTRAINT fk_comentariosoperacion_operacionId
	FOREIGN KEY (operacion_id)
		REFERENCES t_operaciones(id)
		ON DELETE NO ACTION
		ON UPDATE NO ACTION;
		
CREATE TABLE t_mensualidades
(
	id						INT(8)			NOT NULL AUTO_INCREMENT,
	prestamo_id		INT(6)			NOT NULL 	,
	mes						INT(2)			NOT NULL  ,
	year					INT(4)			NOT NULL  ,

	PRIMARY KEY (id)

) ENGINE=InnoDB DEFAULT CHARSET=utf8;

ALTER TABLE t_mensualidades
	ADD CONSTRAINT fk_mensualidades_prestamoId
	FOREIGN KEY (prestamo_id)
		REFERENCES t_prestamos(id)
		ON DELETE NO ACTION
		ON UPDATE NO ACTION;
	
INSERT INTO t_metodos_pago
VALUES (null,'En mano');
	
INSERT INTO t_metodos_pago
VALUES (null,'Transferencia bancaria');

INSERT INTO t_metodos_pago
VALUES (null,'Ingreso en cajero');

INSERT INTO t_estados_operaciones
VALUES (null, 'Pendiente');

INSERT INTO t_estados_operaciones
VALUES (null, 'En curso');

INSERT INTO t_estados_operaciones
VALUES (null, 'Realizada');

INSERT INTO t_estados_operaciones
VALUES (null, 'Cancelada');

INSERT INTO t_estados_prestamo
VALUES (null, 'Pendiente');

INSERT INTO t_estados_prestamo
VALUES (null, 'En curso');

INSERT INTO t_estados_prestamo
VALUES (null, 'Pagado');

