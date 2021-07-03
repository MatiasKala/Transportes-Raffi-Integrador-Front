export const mixinLocal = {
    mounted () {
    },
    methods:{
      cambiarVisibilidadAgregar(){
        this.$refs['agregar-modal'].toggle('#toggle-btn')
      },
      cambiarVisibilidadEditar(data){
        this.setData(data)
        this.$refs['editar-modal'].toggle('#toggle-btn')
      },
      cambiarVisibilidadEliminar(data){
        this.setData(data)
        this.$refs['eliminar-modal'].toggle('#toggle-btn')
      },
      cambiarVisibilidadAsignarChofer(){
        this.$refs['asignar-chofer-modal'].toggle('#toggle-btn')
      },
      cambiarVisibilidadAsignarCliente(){
        this.$refs['asignar-cliente-modal'].toggle('#toggle-btn')
      },
      cambiarVisibilidadAsignarVehiculo(){
        this.$refs['asignar-vehiculo-modal'].toggle('#toggle-btn')
      },
      isSortable(campo){
        let campos = this.getCamposOrdenables()
        return campos.includes(campo)
      },
    },
    computed : {
    }
}
