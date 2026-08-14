from django.db import models


class Roles(models.Model):
    rol_id = models.AutoField(primary_key=True, db_column='rol_id')
    nombre_rol = models.CharField(max_length=50, db_column='nombre_rol')
    descripcion = models.TextField(default='', db_column='descripcion')

    class Meta:
        db_table = 'roles'


class Usuarios(models.Model):
    usuario_id = models.AutoField(primary_key=True, db_column='usuario_id')
    nombre = models.CharField(max_length=100, db_column='nombre')
    apellido = models.CharField(max_length=100, db_column='apellido')
    email = models.CharField(max_length=150, unique=True, db_column='email')
    password_hash = models.CharField(max_length=255, db_column='password_hash')
    telefono = models.CharField(max_length=20, blank=True, default='', db_column='telefono')
    direccion = models.TextField(blank=True, default='', db_column='direccion')
    rol = models.ForeignKey(Roles, on_delete=models.PROTECT, db_column='rol_id', related_name='usuarios')
    fecha_registro = models.DateTimeField(auto_now_add=True, db_column='fecha_registro')

    class Meta:
        db_table = 'usuarios'


class PerfilesFotografos(models.Model):
    perfil_id = models.AutoField(primary_key=True, db_column='perfil_id')
    usuario = models.ForeignKey(Usuarios, on_delete=models.CASCADE, db_column='usuario_id', related_name='perfil')
    biografia = models.TextField(blank=True, default='', db_column='biografia')
    especialidad = models.CharField(max_length=100, db_column='especialidad')
    tarifa_base = models.DecimalField(max_digits=10, decimal_places=2, db_column='tarifa_base')
    enlace_portafolio = models.CharField(max_length=255, blank=True, default='', db_column='enlace_portafolio')

    class Meta:
        db_table = 'perfiles_fotografos'


class Categorias(models.Model):
    categoria_id = models.AutoField(primary_key=True, db_column='categoria_id')
    nombre_categoria = models.CharField(max_length=100, db_column='nombre_categoria')
    descripcion = models.TextField(default='', db_column='descripcion')

    class Meta:
        db_table = 'categorias'


class PortafoliosGalerias(models.Model):
    galeria_id = models.AutoField(primary_key=True, db_column='galeria_id')
    fotografo = models.ForeignKey(PerfilesFotografos, on_delete=models.CASCADE, db_column='fotografo_id', related_name='galerias')
    titulo_obra = models.CharField(max_length=150, db_column='titulo_obra')
    descripcion = models.TextField(default='', db_column='descripcion')
    imagen_url = models.CharField(max_length=255, db_column='imagen_url')
    categoria = models.ForeignKey(Categorias, on_delete=models.PROTECT, db_column='categoria_id', related_name='galerias')
    fecha_subida = models.DateTimeField(auto_now_add=True, db_column='fecha_subida')

    class Meta:
        db_table = 'portafolios_galerias'


class ServiciosProductos(models.Model):
    TIPO_ITEM_CHOICES = [
        ('Digital', 'Digital'),
        ('Impresión', 'Impresión'),
        ('Sesión', 'Sesión'),
    ]

    item_id = models.AutoField(primary_key=True, db_column='item_id')
    fotografo = models.ForeignKey(Usuarios, on_delete=models.CASCADE, db_column='fotografo_id', related_name='servicios')
    nombre_item = models.CharField(max_length=150, db_column='nombre_item')
    descripcion = models.TextField(default='', db_column='descripcion')
    precio = models.DecimalField(max_digits=10, decimal_places=2, db_column='precio')
    tipo_item = models.CharField(max_length=20, choices=TIPO_ITEM_CHOICES, db_column='tipo_item')
    stock = models.IntegerField(default=0, db_column='stock')

    class Meta:
        db_table = 'servicios_productos'


class ReservasPedidos(models.Model):
    pedido_id = models.AutoField(primary_key=True, db_column='pedido_id')
    cliente = models.ForeignKey(Usuarios, on_delete=models.CASCADE, db_column='cliente_id', related_name='pedidos_cliente')
    fotografo = models.ForeignKey(Usuarios, on_delete=models.CASCADE, db_column='fotografo_id', related_name='pedidos_fotografo')
    item = models.ForeignKey(ServiciosProductos, on_delete=models.CASCADE, db_column='item_id', related_name='pedidos')
    fecha_pedido = models.DateTimeField(auto_now_add=True, db_column='fecha_pedido')
    fecha_sesion_reservada = models.DateTimeField(db_column='fecha_sesion_reservada')
    estado_pedido = models.CharField(max_length=50, db_column='estado_pedido')
    total_pedido = models.DecimalField(max_digits=10, decimal_places=2, db_column='total_pedido')

    class Meta:
        db_table = 'reservas_pedidos'


class Pagos(models.Model):
    pago_id = models.AutoField(primary_key=True, db_column='pago_id')
    pedido = models.ForeignKey(ReservasPedidos, on_delete=models.CASCADE, db_column='pedido_id', related_name='pagos')
    metodo_pago = models.CharField(max_length=50, db_column='metodo_pago')
    monto_pagado = models.DecimalField(max_digits=10, decimal_places=2, db_column='monto_pagado')
    comision_plataforma = models.DecimalField(max_digits=10, decimal_places=2, db_column='comision_plataforma')
    estado_pago = models.CharField(max_length=50, db_column='estado_pago')
    fecha_pago = models.DateTimeField(auto_now_add=True, db_column='fecha_pago')

    class Meta:
        db_table = 'pagos'


class Reseñas(models.Model):
    reseña_id = models.AutoField(primary_key=True, db_column='reseña_id')
    fotografo = models.ForeignKey(Usuarios, on_delete=models.CASCADE, db_column='fotografo_id', related_name='reseñas_recibidas')
    cliente = models.ForeignKey(Usuarios, on_delete=models.CASCADE, db_column='cliente_id', related_name='reseñas_emitidas')
    calificacion = models.IntegerField(db_column='calificacion')
    comentario = models.TextField(default='', db_column='comentario')
    fecha_reseña = models.DateTimeField(auto_now_add=True, db_column='fecha_reseña')

    class Meta:
        db_table = 'reseñas'